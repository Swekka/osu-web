<?php

// Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
// See the LICENCE file in the repository root for full licence text.

namespace App\Models;

use App\Traits\Validatable;

/**
 * @property \Carbon\Carbon $created_at
 * @property array|null $details
 * @property string $name
 * @property int $id
 * @property \Carbon\Carbon $updated_at
 * @property int $user_id
 */
class UserNotificationOption extends Model
{
    use Validatable;

    const BEATMAPSET_DISQUALIFIABLE_NOTIFICATIONS = [
        Notification::BEATMAPSET_DISCUSSION_QUALIFIED_PROBLEM,
        Notification::BEATMAPSET_DISQUALIFY,
    ];

    const BEATMAPSET_MODDING = 'beatmapset:modding'; // matches Follow notifiable_type:subtype
    const DELIVERY_MODES = ['mail', 'push'];
    const FORUM_TOPIC_REPLY = Notification::FORUM_TOPIC_REPLY;
    const COMMENT_REPLY = Notification::COMMENT_REPLY; // FIXME: temporary until mail notification changes get merged in
    const HAS_DELIVERY_MODES = [self::BEATMAPSET_MODDING, self::FORUM_TOPIC_REPLY];

    protected $casts = [
        'details' => 'array',
    ];

    public static function supportsNotifications(string $name)
    {
        return in_array($name, static::HAS_DELIVERY_MODES, true)
            || in_array($name, static::BEATMAPSET_DISQUALIFIABLE_NOTIFICATIONS, true)
            || $name === static::COMMENT_REPLY;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function setDetailsAttribute($value)
    {
        $details = $this->details ?? [];

        if (!is_array($value)) {
            $value = null;
        }

        if (in_array($this->name, static::BEATMAPSET_DISQUALIFIABLE_NOTIFICATIONS, true)) {
            if (is_array($value['modes'] ?? null)) {
                $modes = array_filter($value['modes'], 'is_string');
                $validModes = array_keys(Beatmap::MODES);

                $details['modes'] = array_values(array_intersect($modes, $validModes));
            }
        }

        if (in_array($this->name, static::HAS_DELIVERY_MODES, true)
            || $this->name === static::COMMENT_REPLY) {
            foreach (static::DELIVERY_MODES as $mode) {
                if (isset($value[$mode])) {
                    $details[$mode] = get_bool($value[$mode] ?? null);
                }
            }
        }

        if (!empty($details)) {
            $detailsString = json_encode($details);
        }

        $this->attributes['details'] = $detailsString ?? null;
    }

    public function setNameAttribute($value)
    {
        if (!(static::supportsNotifications($value))) {
            $value = null;
        }

        $this->attributes['name'] = $value;
    }

    public function isValid()
    {
        $this->validationErrors()->reset();

        if (!present($this->user_id)) {
            $this->validationErrors()->add('user_id', 'required');
        }

        if (!present($this->name)) {
            $this->validationErrors()->add('name', 'required');
        }

        return $this->validationErrors()->isEmpty();
    }

    public function save(array $options = [])
    {
        return $this->isValid() && parent::save($options);
    }

    public function validationErrorsTranslationPrefix()
    {
        return 'user_notification_option';
    }
}

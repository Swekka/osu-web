<?php

// Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
// See the LICENCE file in the repository root for full licence text.

declare(strict_types=1);

namespace Database\Factories\UserStatistics\Spotlight;

use App\Models\UserStatistics\Spotlight\Fruits;

class FruitsFactory extends ModelFactory
{
    protected $model = Fruits::class;

    // TODO: remove following line after removing legacy-factories
    // fooling legacy-factories' "isLegacyFactory" check: class Hello extends Factory
}

<?php

// Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
// See the LICENCE file in the repository root for full licence text.

return [
    'availability' => [
        'disabled' => 'Tätä rytmikarttaa ei voi juuri nyt ladata.',
        'parts-removed' => 'Joitain osia tästä beatmapista on poistettu joko sen tekijän tai kolmannen osapuolen oikeuksien omaavan pyynnöstä.',
        'more-info' => 'Klikkaa nähdäksesi lisätietoja.',
        'rule_violation' => 'Osa tämän beatmapin resursseista on poistettu, koska on katsottu, että niiden käyttö ei sovi osu!un.',
    ],

    'cover' => [
        'deleted' => 'Poistettu rytmikartta',
    ],

    'download' => [
        'limit_exceeded' => 'Hidasta vähän, pelaa enemmän.',
    ],

    'featured_artist_badge' => [
        'label' => 'Esitelty artisti',
    ],

    'index' => [
        'title' => 'Rytmikarttojen listaus',
        'guest_title' => 'Beatmapit',
    ],

    'panel' => [
        'empty' => 'ei rytmikarttoja',

        'download' => [
            'all' => 'lataa',
            'video' => 'lataa videon kanssa',
            'no_video' => 'lataa ilman videota',
            'direct' => 'avaa osu!directissä',
        ],
    ],

    'nominate' => [
        'hybrid_requires_modes' => 'Usean pelimuodon rytmikartta edellyttää, että valitset ainakin yhden pelimuodon, jonka panet ehdolle.',
        'incorrect_mode' => 'Sinulla ei ole käyttöoikeutta panna ehdolle pelimuotoa: :mode',
        'full_bn_required' => 'Sinun on oltava täysivaltainen ehdollepanija, jotta voit tehdä tämän kelpuuttavan ehdollepanon.',
        'too_many' => 'Ehdollepanovaatimus on jo täyttynyt.',

        'dialog' => [
            'confirmation' => 'Oletko varma, että haluat ehdollepanna tämän rytmikartan?',
            'header' => 'Ehdollepane rytmikartta',
            'hybrid_warning' => 'huomaa: voit tehdä ehdollepanon vain kerran, joten varmista, että olet valinnut kaikki pelimuodot, jotka aiot panna ehdolle',
            'which_modes' => 'Mitkä pelimuodot ehdollepannaan?',
        ],
    ],

    'nsfw_badge' => [
        'label' => 'Sopimaton',
    ],

    'show' => [
        'discussion' => 'Keskustelu',

        'admin' => [
            'full_size_cover' => 'Näytä täysikokoinen kansikuva',
        ],

        'deleted_banner' => [
            'title' => 'Tämä rytmikartta on poistettu.',
            'message' => '(tämä näkyy vain moderaattoreille)',
        ],

        'details' => [
            'by_artist' => 'esittäjältä :artist',
            'favourite' => 'lisää tämä rytmikartta suosikkeihin',
            'favourite_login' => 'kirjaudu sisään, niin voit lisätä tämän beatmapin suosikkeihin',
            'logged-out' => 'Sinun täytyy kirjautua sisään ladataksesi beatmappeja!',
            'mapped_by' => 'kartoittanut :mapper',
            'mapped_by_guest' => 'vieraileva vaikeustaso, kartoittanut :mapper',
            'unfavourite' => 'poista tämä rytmikartta suosikeista',
            'updated_timeago' => 'päivitetty viimeksi :timeago',

            'download' => [
                '_' => 'Lataa',
                'direct' => '',
                'no-video' => 'ilman videota',
                'video' => 'videon kanssa',
            ],

            'login_required' => [
                'bottom' => 'lisäomimaisuuksien käyttämiseen',
                'top' => 'Kirjaudu sisään',
            ],
        ],

        'details_date' => [
            'approved' => 'hyväksytty :timeago',
            'loved' => 'rakastettu :timeago',
            'qualified' => 'kelpuutettu :timeago',
            'ranked' => 'rankattu :timeago',
            'submitted' => 'lähetetty :timeago',
            'updated' => 'päivitetty viimeksi :timeago',
        ],

        'favourites' => [
            'limit_reached' => 'Sinulla on liian monta lempikappaletta! Poista joitain suosikeistasi ja yritä sitten uudelleen.',
        ],

        'hype' => [
            'action' => 'Jos nautit tästä kartasta, hurraa sitä edistääksesi sen siirtymistä <strong>rankatuksi</strong>.',

            'current' => [
                '_' => 'Tämä kartta on :status.',

                'status' => [
                    'pending' => 'vireillä',
                    'qualified' => 'kelpuutettu',
                    'wip' => 'työn alla',
                ],
            ],

            'disqualify' => [
                '_' => 'Jos löydät ongelman, joka liittyy tähän rytmikarttaan, ole hyvä ja epäkelpuuta se :link.',
            ],

            'report' => [
                '_' => 'Jos löydät jonkun ongelman tässä rytmikartassa, ilmoita siitä :link hälyttääksesi tiimin paikalle.',
                'button' => 'Ilmoita Ongelma',
                'link' => 'täällä',
            ],
        ],

        'info' => [
            'description' => 'Kuvaus',
            'genre' => 'Tyylilaji',
            'language' => 'Kieli',
            'no_scores' => 'Dataa lasketaan...',
            'nominators' => 'Ehdollepanijat',
            'nsfw' => 'Sopimaton sisältö',
            'offset' => 'Vastapaino verkossa',
            'points-of-failure' => 'Epäonnistumiskohdat',
            'source' => 'Lähde',
            'storyboard' => 'Tämä rytmikartta sisältää taustaesityksen',
            'success-rate' => 'Läpäisyprosentti',
            'tags' => 'Tunnisteet',
            'video' => 'Tämä rytmikartta sisältää videon',
        ],

        'nsfw_warning' => [
            'details' => 'Tämä rytmikartta sisältää sopimatonta, loukkaavaa tai järkyttävää sisältöä. Haluatko kuitenkin tarkastella sitä?',
            'title' => 'Sopimatonta sisältöä',

            'buttons' => [
                'disable' => 'Poista varoitus käytöstä',
                'listing' => 'Rytmikarttojen listaukseen',
                'show' => 'Näytä',
            ],
        ],

        'scoreboard' => [
            'achieved' => 'saavutettu :when',
            'country' => 'Maakohtaiset sijoitukset',
            'error' => 'Sijoituksen lataaminen epäonnistui',
            'friend' => 'Kavereiden sijoitukset',
            'global' => 'Maailmanlaajuiset sijoitukset',
            'supporter-link' => 'Klikkaa <a href=":link">tästä</a> nähdäksesi kaikki hienot ominaisuudet mitä saat!',
            'supporter-only' => 'Sinun täytyy olla osu!n tukija nähdäksesi kaveri-, maa- ja muunnelmakohtaiset sijoitukset!',
            'title' => 'Tulokset',

            'headers' => [
                'accuracy' => 'Tarkkuus',
                'combo' => 'Suurin iskuputki',
                'miss' => 'Ohi',
                'mods' => 'Muunnelmat',
                'pin' => 'Kiinnitä',
                'player' => 'Pelaaja',
                'pp' => '',
                'rank' => 'Sijoitus',
                'score' => 'Pisteet',
                'score_total' => 'Kokonaispisteet',
                'time' => 'Aika',
            ],

            'no_scores' => [
                'country' => 'Kartasta ei vielä löydy maansisäisiä tuloksia!',
                'friend' => 'Kukaan kavereistasi ei vielä ole saanut tulosta tässä mapissa!',
                'global' => 'Tuloksia ei ole. Voisit hankkia niitä.',
                'loading' => 'Ladataan tuloksia...',
                'unranked' => 'Rankkaamaton rytmikartta.',
            ],
            'score' => [
                'first' => 'Johdossa',
                'own' => 'Sinun parhaasi',
            ],
            'supporter_link' => [
                '_' => 'Napsauta :here, niin näet kaikki hienot ominaisuudet, jotka saat!',
                'here' => 'täällä',
            ],
        ],

        'stats' => [
            'cs' => 'Ympyräkoko',
            'cs-mania' => 'Näppäinten määrä',
            'drain' => 'Terveyden valutus',
            'accuracy' => 'Tarkkuus',
            'ar' => 'Lähestymisnopeus',
            'stars' => 'Tähtiluokitus',
            'total_length' => 'Pituus',
            'bpm' => 'BPM',
            'count_circles' => 'Ympyröiden määrä',
            'count_sliders' => 'Slidereiden määrä',
            'offset' => 'Vastapaino verkossa: :offset',
            'user-rating' => 'Käyttäjien arvio',
            'rating-spread' => 'Arvioiden jakauma',
            'nominations' => 'Suositukset',
            'playcount' => 'Pelikertojen määrä',
        ],

        'status' => [
            'ranked' => 'Rankattu',
            'approved' => 'Hyväksytty',
            'loved' => 'Rakastettu',
            'qualified' => 'Kelpuutettu',
            'wip' => 'Työn alla',
            'pending' => 'Vireillä',
            'graveyard' => 'Hautausmaa',
        ],
    ],

    'spotlight_badge' => [
        'label' => 'Kohdevalo',
    ],
];

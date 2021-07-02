<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Link;
use Faker\Generator as Faker;

$factory->define(Link::class, function (Faker $faker) {
    return [
        'original_content_title' => $faker->realText(40),
        'link_url' => 'https://shoparoe.myshopify.com/discount/50JULY4?redirect=%2Fproducts%2Fadidas-classic-backpack-legend-ink-multicolour&utm_source=youtube&utm_medium=video&utm_campaign=50July4&utm_term=ad&utm_campaign=banner8',
        'campaign_source' => $faker->randomElement(array ('facebook','instagram','pinterest','twitter','tiktok','youtube')),
        'campaign_medium' => $faker->word, 
        'campaign_name' => $faker->word,
        'campaign_term' => $faker->word,
        'campaign_content' => $faker->word,
        'discount_code' => $faker->word,
        'original_content_url' => 'https://shoparoe.myshopify.com/products/adidas-classic-backpack-legend-ink-multicolour',
        'link_type' => $faker->randomElement(array ('product','collection','custom')),
        'link_img_url' => $faker->randomElement(array ('https://cdn.shopify.com/s/files/1/0438/0187/0496/products/8072c8b5718306d4be25aac21836ce16.jpg?v=1600905287','https://cdn.shopify.com/s/files/1/0438/0187/0496/collections/de257d81c4c71c6a281b05f0e79b057c.jpg?v=1600905363','https://cdn.shopify.com/s/files/1/0438/0187/0496/products/9e0022e2f92e19ed96c8f908f2cf1b40.jpg?v=1600905268')),
        'original_content_id' => 'gid://shopify/Product/5679116910752',
        'user_id' => 1,
        'created_at' => $faker->dateTimeBetween('-30 Days', '+1 week'),
        'updated_at' => $faker->dateTimeBetween('-30 Days', '+1 week'),
    ];
});

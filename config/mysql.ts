"use strict";

export const mysql = {
    host: process.env.WPDB_HOST,
    port: process.env.WPDB_PORT,
    database: process.env.WPDB_DATABASE,
    user: process.env.WPDB_USER,
    password: process.env.WPDB_PASSWORD,
    charset: process.env.WPDB_CHARSET,
    wp_prefix: process.env.WPDB_WP_PREFIX,
};
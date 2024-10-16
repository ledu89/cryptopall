'use strict';

/**
 * crypto-asset service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::crypto-asset.crypto-asset');

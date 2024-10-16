const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::crypto-asset.crypto-asset",
  ({ strapi }) => ({
    async create(ctx) {
      const { user } = ctx.state;
      const { name, symbol, amount } = ctx.request.body.data;

      if (!user) {
        return ctx.badRequest("User is not logged in");
      }

      // Check if the asset already exists for the logged-in user
      const existingAsset = await strapi.entityService.findMany(
        "api::crypto-asset.crypto-asset",
        {
          filters: {
            name,
            symbol,
            users_permissions_users: user.id,
          },
        }
      );

      if (existingAsset && existingAsset.length > 0) {
        // Update the amount if the asset exists for the current user
        const updatedAmount = existingAsset[0].amount + amount;

        const updatedAsset = await strapi.entityService.update(
          "api::crypto-asset.crypto-asset",
          existingAsset[0].id,
          {
            data: {
              amount: updatedAmount,
              publishedAt: new Date(), // Set the published date to mark it as published
            },
          }
        );

        return this.transformResponse(updatedAsset);
      } else {
        // Check if the asset exists for other users
        const assetForOtherUsers = await strapi.entityService.findMany(
          "api::crypto-asset.crypto-asset",
          {
            filters: {
              name,
              symbol,
            },
          }
        );

        if (assetForOtherUsers && assetForOtherUsers.length > 0) {
          // Create a new relation for the current user
          const newAsset = await strapi.entityService.create(
            "api::crypto-asset.crypto-asset",
            {
              data: {
                name,
                symbol,
                description: assetForOtherUsers[0].description,
                current_price: assetForOtherUsers[0].current_price,
                market_cap_rank: assetForOtherUsers[0].market_cap_rank,
                image_url: assetForOtherUsers[0].image_url,
                amount,
                users_permissions_users: [user.id],
                publishedAt: new Date(), // Set the published date to mark it as published
              },
            }
          );

          return this.transformResponse(newAsset);
        } else {
          // Create a new asset if it doesn't exist at all
          const newAsset = await strapi.entityService.create(
            "api::crypto-asset.crypto-asset",
            {
              data: {
                ...ctx.request.body.data,
                users_permissions_users: [user.id],
                publishedAt: new Date(), // Set the published date to mark it as published
              },
            }
          );

          return this.transformResponse(newAsset);
        }
      }
    },
  })
);

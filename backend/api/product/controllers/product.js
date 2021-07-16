const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.product.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.product });
  },


  async findWithNotCover(ctx) {
    const entities = await strapi.services.product.find({
      _where: [{
        cover: false
      }]
    });

    

    return  entities.map(entity => sanitizeEntity( entity, { model: strapi.models.product }));
  },
  async findWithCover(ctx) {
    const entities = await strapi.services.product.find({
      _where: [{
        cover: true
      }]
    });

    

    return  entities.map(entity => sanitizeEntity( entity, { model: strapi.models.product }));
  }
};

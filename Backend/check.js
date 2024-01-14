const zod = require('zod')

const newtodo = zod.object({
        title : zod.string().min(1),
        description : zod.string().min(1),
        stat : zod.boolean()
});

module.exports = {
    newtodo
}
const path = require('path')
const { fs } = require('@vuepress/shared-utils')

const DIR = 'transform'

module.exports = (options, ctx) => ({
  name: '@vuepress/internal-transform-modules',

  alias: {
    '@transform': path.resolve(ctx.tempPath, DIR)
  },

  async clientDynamicModules () {
    const files = [
      path.resolve(__dirname, '../prepare/ClientComputedMixin.js')
    ]

    const modules = await Promise.all(files.map(async file => {
      const { base } = path.parse(file)
      let content = await fs.readFile(file, 'utf-8')
      content = content.replace('module.exports =', 'export default')
      return { name: base, content, dirname: DIR }
    }))

    return modules
  }
})
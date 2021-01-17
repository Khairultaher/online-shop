class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query
    this.queryStr = queryStr
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {}
    console.log(keyword)
    this.query = this.query.find({ ...keyword })
    return this
  }
  filter() {
    const queryCoppy = { ...this.queryStr }
    // removing fields from query
    const removeFields = ['keyword', 'limit', 'page']
    removeFields.forEach((el) => delete queryCoppy[el])

    // advanced filter for price rating etc
    let queryStr = JSON.stringify(queryCoppy)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }
  pagination(resPerPage) {
    const currentpage = Number(this.queryStr.page) || 1
    const skip = currentpage * (currentpage - 1)
    this.query = this.query.limit(resPerPage).skip(skip)
    return this
  }
}

module.exports = ApiFeatures

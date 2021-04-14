module.exports = class ApiFeature {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    //TODO Steps to get specific result
    const excluedFields = ['sort', 'limit', 'page', 'fields']

    // 1) Copy the query object
    const queryObj = { ...this.queryString }

    // 2) Remove excluded fields from queryObj
    excluedFields.forEach((el) => delete queryObj[el])

    // 3) Make string & add $ sign before the query operators
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(
      /\b(lte|gte|gt|lt|ne|eq)\b/g,
      (match) => `$${match}`
    )

    // 5) Pass as arguements to find method
    this.query = this.query.find(JSON.parse(queryStr))
    // console.log(this.queryString)
    return this
  }

  sort() {
    //TODO Steps to sory query results
    // 1) check if sort is queried
    if (!this.queryString.sort) {
      // Default sortBy field
      this.query = this.query.sort('name')
    } else {
      // 2) get the sort by field value & convert 'sortBy=field1,field2 -> 'sortBy=field1 field2
      const sortBy = this.queryString.sort.split(',').join(' ')

      // 3) Pass in sort method
      this.query = this.query.sort(sortBy)
    }
    return this
  }

  limitFields() {
    if (!this.queryString.fields) {
      this.query = this.query.select('-__v')
    } else {
      const fields = this.queryString.fields.split(',').join(' ')
      console.log(fields)
      this.query = this.query.select(fields)
    }
    return this
  }

  paginate() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 1
    const skip = (page - 1) * limit
    this.query.skip(skip).limit(limit)
    return this
  }
}

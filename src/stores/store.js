import {extendObservable, action} from 'mobx';

import without from 'lodash/without'

class AppStore {
  constructor() {
    extendObservable(this, {
      query: {}
    })
  }

  setQuery = action(filters => {
    const query = {}
    filters.forEach(f => {
      const [column, value] = f.split(':')
      if (value) {
        query[column] = (query[column] || []).concat([value])
      } else {
        query['q'] = (query['q'] || '') + column
      }
    })

    without(Object.keys(query), 'q').forEach(key => {
      query[key] = query[key].join(',')
    })

    this.query = query
  })
}

export default AppStore;

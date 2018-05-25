import {extendObservable, action} from 'mobx';
import dayjs from 'dayjs';

import without from 'lodash/without'

class AppStore {
  constructor() {
    extendObservable(this, {
      query: {
        startsAt: dayjs().subtract(1, 'day')
      }
    })
  }

  setQuery = action(filters => {
    const query = {}
    filters.forEach(f => {
      const [column, value] = f.split(':')
      if (value) {
        query[column] = (query[column] || []).concat([value])
      } else {
        query['q'] = (query['query'] || '') + column
      }
    })

    without(Object.keys(query), 'query').forEach(key => {
      query[key] = query[key].join(',')
    })

    this.query = { ...query, startsAt: this.query.startsAt }
  })
}

export default AppStore;

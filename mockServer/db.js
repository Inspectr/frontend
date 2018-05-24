module.exports = {
    trails: [
      {
        id: 12345,
        event: 'delete',
        event_metadata: {},
        created_at: new Date('2017-07-04'),
        timestamp: new Date('2017-07-03'),
        actor: '23094985xzldkwe039',
        actor_metadata: {},
        target: '1823ksd039ps332s',
        target_metadata: {},
        origin: 'checkr',
        origin_metadata: {}
      }
    ],
    // interval=3600 (1hr)
    metrics: [
        { starts_at: new Date('2017-07-03T03:00:00'), interval: 3600, size: 200 },
        { starts_at: new Date('2017-07-03T04:00:00'), interval: 3600, size: 100 }
    ]
}

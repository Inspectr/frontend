import React, { Component } from 'react'
import PropTypes from 'prop-types';
import JSONTree from 'react-json-tree'

const theme = {
  scheme: 'grayscale',
  author: 'alexandre gavioli (https://github.com/alexx2/)',
  base00: '#101010',
  base01: '#252525',
  base02: '#464646',
  base03: '#525252',
  base04: '#ababab',
  base05: '#b9b9b9',
  base06: '#e3e3e3',
  base07: '#f7f7f7',
  base08: '#7c7c7c',
  base09: '#999999',
  base0A: '#a0a0a0',
  base0B: '#8e8e8e',
  base0C: '#868686',
  base0D: '#686868',
  base0E: '#747474',
  base0F: '#5e5e5e'
};

const TrailDetail = ({ data }) => {
	return (
		<div>
			<JSONTree data={{'Trail': { id: data.id }}} theme={theme} hideRoot shouldExpandNode={(key) => true} />
      <JSONTree data={{'Actor': data.actorMetadata}} theme={theme} hideRoot shouldExpandNode={(key) => true} />
      <JSONTree data={{'Event': data.eventMetadata}} theme={theme} hideRoot shouldExpandNode={(key) => true} />
      <JSONTree data={{'Target': data.targetMetadata}} theme={theme} hideRoot shouldExpandNode={(key) => true} />
      <JSONTree data={{'Origin': data.originMetadata}} theme={theme} hideRoot shouldExpandNode={(key) => true} />
    </div>                    
	);
}	

TrailDetail.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TrailDetail;

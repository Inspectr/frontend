FROM node:10

ARG PORT=3000
ENV PORT=${PORT}   

ARG REACT_APP_CIRCUIT_URI=http://localhost:3011
ENV REACT_APP_CIRCUIT_URI=${REACT_APP_CIRCUIT_URI}

ARG REACT_APP_CIRCUIT_WSS_URI=http://localhost:3011
ENV REACT_APP_CIRCUIT_WSS_URI=${REACT_APP_CIRCUIT_WSS_URI}

ARG REACT_APP_DEX_URI=http://localhost:5556
ENV REACT_APP_DEX_URI=${REACT_APP_DEX_URI}

ARG REACT_APP_DEX_CLIENT_ID=example-app
ENV REACT_APP_DEX_CLIENT_ID=${REACT_APP_DEX_CLIENT_ID}

ARG REACT_APP_DASHBOARD_URI=http://localhost:3010
ENV REACT_APP_DASHBOARD_URI=${REACT_APP_DASHBOARD_URI}

RUN apt update
RUN apt install xsel

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/app/package.json
ADD yarn.lock /usr/src/app/yarn.lock
RUN yarn
RUN npm install -g serve

ADD . /usr/src/app/
RUN npm run build 

EXPOSE 3000

# start app
CMD ["serve", "-s", "build", "-p", "3000"]

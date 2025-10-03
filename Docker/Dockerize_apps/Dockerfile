# # take this as base image ie machine jisme humari app chalegi vo ubuntu ki hai
# FROM node:20.17.0-alpine3.19
# # FROM ubuntu

# # # Install dependencies
# # # since ubuntu image banai hai toh nodejs and npm dono install krne padenge using ubuntu method
# # RUN apt-get update -y
# # RUN apt-get install curl -y
# # RUN curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
# # RUN bash /tmp/nodesource_setup.sh
# # RUN apt-get install nodejs -y



# # Copy package.json and index.js files to the container 
# # basically index.js mere pc se utha kar container ke /home/app/index.js pe copy kr dega
# COPY index.js /home/app/index.js
# COPY package.json /home/app/package.json
# COPY package-lock.json /home/app/package-lock.json
# # we don't copy node modules because we will install them in the container itself

# # Set the working directory to /home/app
# WORKDIR /home/app

# RUN npm install

# CMD ["npm", "start"]




# optimized version
FROM node:20.17.0-alpine3.19

WORKDIR /home/app

RUN apk add --no-cache curl
COPY package.json package.json
COPY package-lock.json package-lock.json
# or instead of above 2 we can also use wildcards - COPY package*.json ./
RUN npm install 


COPY index.js index.js

COPY Dockerfile Dockerfile


ENV PORT=8000
EXPOSE 8000

CMD ["npm", "start"]
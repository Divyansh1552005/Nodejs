# take this as base image ie machine jisme humari app chalegi vo ubuntu ki hai
FROM ubuntu


# Install dependencies
# since ubuntu image banai hai toh nodejs and npm dono install krne padenge using ubuntu method
RUN apt-get update -y
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_18.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt-get install nodejs -y



# Copy package.json and index.js files to the container 
# basically index.js mere pc se utha kar container ke /home/app/index.js pe copy kr dega
COPY index.js /home/app/index.js
COPY package.json /home/app/package.json
COPY package-lock.json /home/app/package-lock.json
# we don't copy node modules because we will install them in the container itself

# Set the working directory to /home/app
WORKDIR /home/app

RUN npm install




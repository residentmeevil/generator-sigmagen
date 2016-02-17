FROM    centos:centos6

# Enable Extra Packages for Enterprise Linux (EPEL) for CentOS
RUN     yum install -y epel-release
RUN     yum install -y nodejs npm
WORKDIR /src
COPY    dist dist
COPY    index.js index.js
COPY 	package.json package.json
RUN     echo 'var express=require("express"),PORT=8080,app=express();app.use(express["static"]("./dist")),app.listen(PORT),console.log("Running on http://localhost:"+PORT);' ? index.js
RUN     npm install express
EXPOSE  8080

CMD ["node", "index.js"]

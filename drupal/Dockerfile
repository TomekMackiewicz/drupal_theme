FROM php:8.1-fpm-alpine

RUN docker-php-ext-install mysqli pdo pdo_mysql 

RUN apk add --no-cache \
        libjpeg-turbo-dev \
        libpng-dev \
        libwebp-dev \
        freetype-dev

RUN docker-php-ext-configure gd --with-jpeg --with-webp --with-freetype
RUN docker-php-ext-install gd opcache

COPY ./ /var/www/html
WORKDIR /var/www/html

CMD php-fpm

EXPOSE 9000
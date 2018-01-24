#!/bin/bash
ssh root@linode > /dev/null 2>&1 << eeooff
cd /var/www/html/Crypto
git pull origin master
exit
eeooff
echo done!
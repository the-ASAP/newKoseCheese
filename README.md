# Козий сыр
Интернет магазин сыра различных видов. React/NextJS/SASS

https://ko-cheese-six.vercel.app/


# deploy
## Предварительная настройка
1. Загрузить архив на VPS.
1. В настройках битрикс активрировать node js.
В меню настроек bitrix vm (bash /root/menu.sh) выбираем "9. Configure Push/RTC service for the pool" 
потом "Install/Update NodeJS RTC service" и устанавливаем. (минут 5-10 дилтся установка).
1. Далее переходим в каталог куда загрузили архив (/app/) распаковываем его в /app/frontend/ (или еще куда-то, это не важно).
1. Переходим в каталог куда распаковали все.
1. Выполняем команду npm i
1. Потом команду npm run-script build
1. И npm start

## Переходим к тестированию.
1. Открываем конфиг nginx (/etc/nginx/bx/site_avaliable/<имя сайта>.conf) (у меня это /etc/nginx/bx/site_avaliable/s1.conf)
1. Делаем бекап cp s1.conf s1.conf.bak
1. Туда пишем такой код вместо всего что там есть.

        server {
            listen        80;
            server_name _;
            server_name_in_redirect off;

            location / {

                proxy_set_header	X-Real-IP        $remote_addr;
                proxy_set_header	X-Forwarded-For  $proxy_add_x_forwarded_for;
                proxy_set_header	Host $host:80;


                proxy_pass         http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header   Upgrade $http_upgrade;
                proxy_set_header   Connection $connection_upgrade;
                # proxy_set_header   Host $host;
                proxy_cache_bypass $http_upgrade;

                location /bitrix
                {
                    proxy_pass         http://localhost:8888;
                }

                location /upload
                {
                    proxy_pass         http://localhost:8888;
                }

                # location /rest
                # {
                # 	proxy_pass         http://localhost:8888;
                # }
            }
        }
1. Проверяем что все работает (сайт и админка)

## Завершение
1. Создаем службу для нашего nodejs сервера.
1. Переходим в папку /etc/systemd/system/
1. Создаем файл frontend.service
1. И в него пишем следующий код (проверяй через vim чтоб небыло лишних симовлов в коде)
    
        # FRONTEND
        [Unit]
        Description=Node.Js, Next.Js application

        [Service]
        AmbientCapabilities=CAP_SYS_RAWIO
        User=nobody
        WorkingDirectory=/app/frontend/
        Type=simple
        ExecStart=/usr/bin/npm start
        #Restart=on-failure
        #RestartSec=10

        [Install]
        WantedBy=multi-user.target

1. Потом выполняем команду systemctl daemon-reload
1. И systemctl enable frontend.service
1. И systemctl start frontend.service
1. Проверям что все запустилось нормально systemctl status frontend.service
1. Готово.

## Прочее
Если не хватает оперативы
1. fallocate -l 2G /swapfile
1. chmod 600 /swapfile
1. mkswap /swapfile
1. swapon /swapfile

Для удаления
1. swapoff -v /swapfile
1. rm /swapfile

<?php
   define('DB_SERVER', 'eastone.c3y2bcgdn85r.us-east-1.rds.amazonaws.com');
   define('DB_USERNAME', 'cam');
   define('DB_PASSWORD', 'fogter01');
   define('DB_DATABASE', 'thetracksradio_database');
   $db = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);
?>
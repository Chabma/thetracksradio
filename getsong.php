<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>

        <?php
        $q = intval($_GET['q']);

        $con = mysqli_connect('eastone.c3y2bcgdn85r.us-east-1.rds.amazonaws.com','cam','fogter01','thetracksradio_database');
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
        }

        mysqli_select_db($con,"thetracksradio_database");
        $sql="SELECT * FROM Songs WHERE Show_Id = '".$a."' AND Episode_Id = '".$b."' AND Song_Num = '".$c."'";
        $result = mysqli_query($con,$sql);
        while($row = mysqli_fetch_array($result)) {
            echo(''+$row['Location']+'');
        }
        mysqli_close($con);
        ?>
    </body>
</html>

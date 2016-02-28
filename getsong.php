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
        echo($_GET['a']);
        $sql="SELECT * FROM Songs WHERE Show_Id = "$_GET['a']" AND Episode_Id = "$_GET['b']" AND Song_Num = "$_GET['c']"";
        $result = mysqli_query($con,$sql);
        while($row = mysqli_fetch_array($result)) {
            echo(''+$row['Location']+'');
            echo("wwhhwh");
        }
        mysqli_close($con);
        ?>
    </body>
</html>

<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <div class="results">
        <?php
            $a = intval($_GET['a']);
            $b = intval($_GET['b']);
            $c = intval($_GET['c']);    

            $con = mysqli_connect('eastone.c3y2bcgdn85r.us-east-1.rds.amazonaws.com','cam','fogter01','thetracksradio_database');
            if (!$con) {
                die('Could not connect: ' . mysqli_error($con));
            }
            
            mysqli_select_db($con,"thetracksradio_database");
            //echo("SELECT * FROM Songs WHERE Show_Id = ".$a." AND Episode_Id = ".$b." AND Song_Num = ".$c."");
            $sql="SELECT * FROM Songs WHERE Show_Id = '".$a."' AND Episode_Id = '".$b."' AND Song_Num = '".$c."'";
            $result = mysqli_query($con,$sql);
            while($row = mysqli_fetch_array($result)) {
               echo($row['Location']));
            }
            mysqli_close($con);
        ?>
        </div>
        
        
        <div class="results">
        <?php
            $a = intval($_GET['a']);
            $b = intval($_GET['b']);
            $c = intval($_GET['c']);

            $con = mysqli_connect('eastone.c3y2bcgdn85r.us-east-1.rds.amazonaws.com','cam','fogter01','thetracksradio_database');
            if (!$con) {
                die('Could not connect: ' . mysqli_error($con));
            }
            mysqli_select_db($con,"thetracksradio_database");
            //echo("SELECT * FROM Songs WHERE Show_Id = ".$a." AND Episode_Id = ".$b." AND Song_Num = ".$c."");
            $sql="SELECT * FROM Songs WHERE Show_Id = '".$a."' AND Episode_Id = '".$b."' AND Song_Num = '".$c."'";
            $result = mysqli_query($con,$sql);
            while($row = mysqli_fetch_array($result)) {
                echo($row['Title']);
            }
            
            
            mysqli_close($con);
        ?>
        </div>
    </body>
</html>

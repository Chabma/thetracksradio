<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <?php
        $con = mysqli_connect('eastone.c3y2bcgdn85r.us-east-1.rds.amazonaws.com','cam','fogter01','thetracksradio_database');
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
        }
        mysqli_select_db($con,"thetracksradio_database");
        $sql="SELECT * FROM Episodes ORDER BY Duration DESC";
        $result = mysqli_query($con,$sql);
        while($row = mysqli_fetch_array($result)) {
            echo('<li onclick= "play_song(');
            echo($row['Show_Id']);
            echo(',');
            echo($row['Episode_Id']);
            echo(',1)">');
            echo('<img src="');
            echo($row['IMG_Location']);
            echo('"><div class="episodes-paragraph"><h3>');
            echo($row['Title']);
            echo('</h3><p>');
            echo($row['Description']);
            echo('<br>Duration: ');
            echo(floor($row['Duration']/360));
            echo(':');
            echo(floor(($row['Duration']%360)/60));
            echo(':');
            echo(floor($row['Duration'])%60) );
            echo('</p></li>');
        }
        mysqli_close($con);
        ?>
    </body>
</html>

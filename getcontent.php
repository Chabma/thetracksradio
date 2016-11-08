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
        $sql="SELECT * FROM Episodes WHERE Show_Id = '".$q."' ORDER BY Release_Date DESC";
        $result = mysqli_query($con,$sql); 
        $counter = 0;
        while($row = mysqli_fetch_array($result)) {
            if($counter % 3 == 0){
                if($counter != 0){
                    echo('</tr>');
                }
                echo('<tr>');
            }
            $counter = $counter + 1;
            echo('<td title= "');
            echo($row['Description']);  
            echo('" onclick= "');
            echo($row['Function']);
            echo($row['Show_Id']);
            echo(',');
            echo($row['Episode_Id']);
            echo(')">');
            echo('<img class="episode_image" src="');
            echo($row['IMG_Location']);
            echo('"><img class="overlay" src="images/button-images/overlay.png"><div class="episodes-paragraph"><h4>');
            echo($row['Title']);
            echo('</h4></br><p>');
            if( $row['Function'] == 'get_count(' ) {
                echo('Duration: ');
                echo(floor($row['Duration']/3600));
                echo(':');
                echo(sprintf("%02d", floor(($row['Duration']%3600)/60)));
                echo(':');
                echo(sprintf("%02d", floor($row['Duration']%60)));
            }
            echo('</p>');
            echo('<form method="get" action=');
            echo($row['Download']);
            echo('><button type="submit">Download</button></form></td>');
        }
        echo('</tr>');
        mysqli_close($con);
        ?>
    </body>
</html>

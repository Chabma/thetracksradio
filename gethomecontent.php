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
        $show_titles = ["","","Twix God","Jams","SoccerShow","John's Thing","Luke's Comic"];
        
        mysqli_select_db($con,"thetracksradio_database");
        $sql="SELECT * FROM Episodes ORDER BY Release_Date DESC";
        $result = mysqli_query($con,$sql);
        $counter = 0;
        echo('<tr>');
        while($row = mysqli_fetch_array($result)) {
            $counter = $counter + 1;
            echo('this is the counter =');
            echo($counter);
            if($counter % 3 == 0){
                echo('</tr>');
                echo('<tr>');
            }
            echo('<td onclick= "');
            echo($row['Function']);
            echo($row['Show_Id']);
            echo(',');
            echo($row['Episode_Id']);
            echo(')">');
            echo('<img class="episode_image" src="');
            echo($row['IMG_Location']);
            echo('"><img class="overlay" src="images/button-images/overlay.png"><div class="episodes-paragraph"><h4>From ');
            echo($show_titles[$row['Show_Id']]);
            echo(': ');
            echo($row['Title']);
            echo('</h4></br><p>');
            if($row['Function'] == 'get_count('){
                echo('Duration: ');
                echo(floor($row['Duration']/3600));
                echo(':');
                echo(sprintf("%02d", floor(($row['Duration']%3600)/60)));
                echo(':');
                echo(sprintf("%02d", floor($row['Duration']%60)));
            }   
            echo('</p></td>');
        }
        echo('</tr>');
        mysqli_close($con);
        ?>
    </body>
</html>

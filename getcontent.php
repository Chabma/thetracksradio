<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <?php
        $q = intval($_GET['q']);
        echo("whoa1");
        $con = mysqli_connect('eastone.c3y2bcgdn85r.us-east-1.rds.amazonaws.com','cam','fogter01','thetracksradio_database');
        if (!$con) {
            die('Could not connect: ' . mysqli_error($con));
        }
        echo("whoa2");
        mysqli_select_db($con,"thetracksradio_database");
        $sql="SELECT * FROM Episodes WHERE Show_Id = '".$q."'";
        $result = mysqli_query($con,$sql);
        while($row = mysqli_fetch_array($result)) {
            echo('<li onclick= "play_song(');
            echo($row['Show_Id']);
            echo(',');
            echo($row['Episode_Id']);
            echo(',1)">');
            echo('<img height = 100% src=');
            echo($row['IMG_Location']);
            echo("><div class=\"episodes-paragraph\"><h3>");
            echo($row['Title']);
            echo('</h3><p>')
            echo($row['Description']);
            echo("</p></li>");    
            echo('<li onclick= "play_song(');
            echo($row['Show_Id']);
            echo(',');
            echo($row['Episode_Id']);
            echo(',1)">');
            echo('</li>\n');
        }
        echo("whoa3");
        mysqli_close($con);
        ?>
    </body>
</html>

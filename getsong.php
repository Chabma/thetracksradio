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
            
            function getTemporaryUrl($key, $secret, $bucket, $path, $expirySeconds = 30){
                $expiry = time() + $expirySeconds;
            
                // Format the string to be signed
                $string = sprintf("GET\n\n\n%s\n/%s/%s", $expiry, $bucket, $path);

                // Generate an HMAC-SHA1 signature for it
                $signature = base64_encode(hash_hmac('sha1', $string, $secret, true));

                // Create the final URL
                return sprintf(
                "https://%s.s3.amazonaws.com/%s?%s",
                $bucket,
                $path,
                http_build_query([
                    'AWSAccessKeyId' => $key,
                    'Expires' => $expiry,
                    'Signature' => $signature
                ])
                );
            }       
            
            mysqli_select_db($con,"thetracksradio_database");
            //echo("SELECT * FROM Songs WHERE Show_Id = ".$a." AND Episode_Id = ".$b." AND Song_Num = ".$c."");
            $sql="SELECT * FROM Songs WHERE Show_Id = '".$a."' AND Episode_Id = '".$b."' AND Song_Num = '".$c."'";
            $result = mysqli_query($con,$sql);
            while($row = mysqli_fetch_array($result)) {
                echo(getTemporaryUrl("AKIAJPM5BXNE3ATMIBJQ", "clxpOdDJNOE7y+OxME4Mbx0Leex/aV0JtU+onfvX", "thetracksradio-mp3s", '/'+$row['Path'],100));
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

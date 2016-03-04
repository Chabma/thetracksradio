<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
        <div class="results">
        <?php
            require 'vendor/autoload.php';
            use Aws\S3\S3Client;
            use Aws\S3\Exception\S3Exception;
            
            $a = intval($_GET['a']);
            $b = intval($_GET['b']);
            $c = intval($_GET['c']);    

            $con = mysqli_connect('eastone.c3y2bcgdn85r.us-east-1.rds.amazonaws.com','cam','fogter01','thetracksradio_database');
            if (!$con) {
                die('Could not connect: ' . mysqli_error($con));
            }
            
            if(!function_exists('el_crypto_hmacSHA1')){
                /**
                * Calculate the HMAC SHA1 hash of a string.
                *
                * @param string $key The key to hash against
                * @param string $data The data to hash
                * @param int $blocksize Optional blocksize
                * @return string HMAC SHA1
                */
                function el_crypto_hmacSHA1($key, $data, $blocksize = 64) {
                    if (strlen($key) > $blocksize) $key = pack('H*', sha1($key));
                    $key = str_pad($key, $blocksize, chr(0x00));
                    $ipad = str_repeat(chr(0x36), $blocksize);
                    $opad = str_repeat(chr(0x5c), $blocksize);
                    $hmac = pack( 'H*', sha1(
                        ($key ^ $opad) . pack( 'H*', sha1(
                            ($key ^ $ipad) . $data
                        ))
                    ));
                    return base64_encode($hmac);
                }
            }

            if(!function_exists('el_s3_getTemporaryLink')){
                /**
                * Create temporary URLs to your protected Amazon S3 files.
                *
                * @param string $accessKey Your Amazon S3 access key
                * @param string $secretKey Your Amazon S3 secret key
                * @param string $bucket The bucket (bucket.s3.amazonaws.com)
                * @param string $path The target file path
                * @param int $expires In minutes
                * @return string Temporary Amazon S3 URL
                * @see http://awsdocs.s3.amazonaws.com/S3/20060301/s3-dg-20060301.pdf
                */
                function el_s3_getTemporaryLink($accessKey, $secretKey, $bucket, $path, $expires = .1) {
                    // Calculate expiry time
                    $expires = time() + intval(floatval($expires) * 60);
                    // Fix the path; encode and sanitize
                    $path = str_replace('%2F', '/', rawurlencode($path = ltrim($path, '/')));
                    // Path for signature starts with the bucket
                    $signpath = '/'. $bucket .'/'. $path;
                    // S3 friendly string to sign
                    $signsz = implode("\n", $pieces = array('GET', null, null, $expires, $signpath));
                    // Calculate the hash
                    $signature = el_crypto_hmacSHA1($secretKey, $signsz);
                    // Glue the URL ...
                    $url = sprintf('http://%s.s3.amazonaws.com/%s', $bucket, $path);
                    // ... to the query string ...
                    $qs = http_build_query($pieces = array(
                        'AWSAccessKeyId' => $accessKey,
                        'Expires' => $expires,
                        'Signature' => $signature,
                    ));
                    // ... and return the URL!
                    return $url.'?'.$qs;
                }
            }          
            
            mysqli_select_db($con,"thetracksradio_database");
            //echo("SELECT * FROM Songs WHERE Show_Id = ".$a." AND Episode_Id = ".$b." AND Song_Num = ".$c."");
            $sql="SELECT * FROM Songs WHERE Show_Id = '".$a."' AND Episode_Id = '".$b."' AND Song_Num = '".$c."'";
            $result = mysqli_query($con,$sql);
            while($row = mysqli_fetch_array($result)) {
                //echo(getTemporaryUrl("AKIAJPM5BXNE3ATMIBJQ", "clxpOdDJNOE7y+OxME4Mbx0Leex/aV0JtU+onfvX","thetracksradio-mp3s", $row['Path'],100));
                echo(el_s3_getTemporaryLink("AKIAJPM5BXNE3ATMIBJQ", "clxpOdDJNOE7y+OxME4Mbx0Leex/aV0JtU+onfvX", "thetracksradio-mp3s", $row['Path'], .03));
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

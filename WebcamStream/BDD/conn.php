<?php   
require_once $_SERVER["DOCUMENT_ROOT"].'/Include/constants.php';

#$mysqli = new mysqli('127.0.0.1', 'root', '','webrtc',3306);
//$mysqli = new  mysqli('127.0.0.1', 'nselmdjn_root', 'Webtest37!', 'nselmdjn_site_perso', 3306);
$mysqli = new  mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);
if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') '
            . $mysqli->connect_error);
}

if (isset($_POST["save_offer"]))
{
    $query = "DELETE FROM offer";

    $mysqli->query($query);

    $offer = utf8_encode ($mysqli-> real_escape_string($_POST["save_offer"]));
    //$query = sprintf("insert into offer(code) value('%s')", base64_encode($_POST["save_offer"]));
    $query = sprintf("insert into offer(code) value('%s')", $offer);

    $mysqli->query($query);

    echo "offre enregistre"; 
   // echo "<a href=".$_SERVER['HTTP_REFERER'].">Retour</a>";


}
if (isset($_POST["save_answer"]))
{

    $query = "DELETE FROM answer";

    $mysqli->query($query);

    $answer = $mysqli->real_escape_string($_POST["save_answer"]);

    $query = sprintf("insert into answer(code) value('%s')", $answer);

    $mysqli->query($query);

    echo "réponse enregistré"; 


}


if (isset($_GET["get_offer"]))
{
    $query = "SELECT code from offer";

    $result = $mysqli->query($query);
    $row = $result -> fetch_assoc();   
   // echo base64_decode($row['code']);
   echo $row['code'];
}

if (isset($_GET["get_answer"]))
{
    $query = "SELECT code from answer";

    $result = $mysqli->query($query);
    $row = $result -> fetch_assoc();   
    //echo base64_decode($row['code']);
    echo $row['code'];
}
$mysqli->close();

?>
<?php
    require "simple_html_dom.php";
    $link = "https://fr.wikipedia.org/wiki/Porte_des_Lilas_(film)";
    $html = new simple_html_dom();
    $html->load_file($link);
    $results = array();

    if (!empty($html)) {
        $div_class = $title = "";
        $i = 0;

        foreach($html->find("div.infobox_v3") as $div_class) {
            foreach($div_class->find("div.italique") as $title) {
                $results[$i]['title'] = $title->plaintext;
            }
            $i++;
        }
    }
    print_r($results);
?>

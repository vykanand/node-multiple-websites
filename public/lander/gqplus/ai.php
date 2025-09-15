<?php
require_once('similarityAi.php');
$a= $_REQUEST['a'];
$b= $_REQUEST['b'];
// echo strcmp($a,$b);

echo "SimilarityPercent- ".similaritypercentage($a,$b); 
echo "<br>SilmilarityIndex - ".similarityindex($a,$b);
echo "<br>ribbonconstant - ".compareStrings($a,$b);
echo "<br>levenshteinDifference - ".lev($a,$b);

function lev($a,$b){ 
return levenshtein($b, $a);
}


function similaritypercentage($a1, $b1){
similar_text($a1, $b1, $percent);
return $percent;
}


function similarityindex($str1, $str2) {
    $len1 = strlen($str1);
    $len2 = strlen($str2);
    
    $max = max($len1, $len2);
    $similarity = $i = $j = 0;
    
    while (($i < $len1) && isset($str2[$j])) {
        if ($str1[$i] == $str2[$j]) {
            $similarity++;
            $i++;
            $j++;
        } elseif ($len1 < $len2) {
            $len1++;
            $j++;
        } elseif ($len1 > $len2) {
            $i++;
            $len1--;
        } else {
            $i++;
            $j++;
        }
    }

    return round($similarity / $max, 2);
}




 function compareStrings($str1, $str2)
    {
        $pairs1 = wordLetterPairs(strtoupper($str1));
        $pairs2 = wordLetterPairs(strtoupper($str2));

        $intersection = 0;

        $union = count($pairs1) + count($pairs2);

        for ($i=0; $i < count($pairs1); $i++)
        {
            $pair1 = $pairs1[$i];

            $pairs2 = array_values($pairs2);
            for($j = 0; $j < count($pairs2); $j++)
            {
                $pair2 = $pairs2[$j];
                if ($pair1 === $pair2)
                {
                    $intersection++;
                    unset($pairs2[$j]);
                    break;
                }
            }
        }

        return (2.0*$intersection)/$union*strlen($str1);
    }





 function letterPairs($str)
    {
        $numPairs = mb_strlen($str)-1;
        $pairs = array();

        for ($i = 0; $i < $numPairs; $i++)
        {
            $pairs[$i] = mb_substr($str,$i,2);
        }

        return $pairs;
    }


     function wordLetterPairs($str)
    {
        $allPairs = array();

        // Tokenize the string and put the tokens/words into an array

        $words = explode(' ', $str);

        // For each word
        for ($w = 0; $w < count($words); $w++)
        {
            // Find the pairs of characters
            $pairsInWord = letterPairs($words[$w]);

            for ($p = 0; $p < count($pairsInWord); $p++)
            {
                $allPairs[] = $pairsInWord[$p];
            }
        }

        return $allPairs;
    }

?>
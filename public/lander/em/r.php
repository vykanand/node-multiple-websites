<?php
require 'vendor/autoload.php';

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Reader\Xlsx;

$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();
$spreadsheet = $reader->load("prd.xlsx");

$sheetData = $spreadsheet->getActiveSheet()->toArray();
array_shift($sheetData);
print_r($sheetData);


// use PhpOffice\PhpSpreadsheet\Reader\Csv;

// $reader = new \PhpOffice\PhpSpreadsheet\Reader\Csv();
// $spreadsheet = $reader->load("PATH_TO_YOUR_CSV_FILE");

// $sheetData = $spreadsheet->getActiveSheet()->toArray();
// print_r($sheetData);

?>

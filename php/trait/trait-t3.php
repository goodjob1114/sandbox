<?php
trait HelloWorldtest {
    public function sayHello() {
        echo 'Hello World!';
    }
}

class TheWorldIsNotEnough {
    use HelloWorldtest;
    // public function sayHello() {
    //     echo 'Hello Universe trait!';
    // }
}

$o = new TheWorldIsNotEnough();
$o->sayHello();
?>
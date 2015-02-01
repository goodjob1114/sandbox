#!/usr/bin/perl

$| = 1;
$_cpu_threshold = 3;
@_init = (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
$_time_interval = 1;

@_status = @_init;

$_index = 0;

sub array_sum {
  my (@a) = @_;
  my $sum = 0;

  print "a[$_index] = ";

  while (($key, $value) = each(@a)) 
  {
    print "$value ";
    $sum += $value;
  }

  print "\n";

  $_index++;

  return $sum;
}

sub get_cpu_usage {
  # fixed #1 issue...test
  my $system_cpu_usage = `ps aux | awk 'BEGIN {SUM=0} {if($3 > 0) SUM += $3} END {print SUM}'`;
  
  print "system_cpu_usage = $system_cpu_usage\n";
  
  return $system_cpu_usage;
}

sub is_cpu_too_busy {
  my ($_usage) = @_;

  return ($_usage > $_cpu_threshold) ? 1 : 0;
}

sub cpu_utilization_check {
  my $_cpu_usage = get_cpu_usage();        

  my $cpu_flag = is_cpu_too_busy($_cpu_usage);

  shift(@_status);
  push(@_status, $cpu_flag);
  
  my $total = array_sum(@_status);
  
  print "total = $total\n";
}

sub main {

  while (1 == 1) {
    cpu_utilization_check();
    sleep($_time_interval);
  }
}

main();

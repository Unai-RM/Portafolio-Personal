$ports = @(3000, 3001, 3002)
foreach ($port in $ports) {
    $processId = netstat -ano | findstr ":$port" | findstr "LISTENING"
    if ($processId) {
        $pid = $processId.Split(' ')[-1]
        taskkill /PID $pid /F
    }
}

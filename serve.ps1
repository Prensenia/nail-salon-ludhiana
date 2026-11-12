# Minimal static file server (PowerShell / .NET)
$root = Join-Path $PSScriptRoot ""
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://127.0.0.1:4173/")
$listener.Start()
Write-Host "Serving $root at http://127.0.0.1:4173/"
$types = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".jpg"  = "image/jpeg"; ".jpeg" = "image/jpeg"; ".png" = "image/png"
  ".svg"  = "image/svg+xml"; ".ico" = "image/x-icon"; ".webp" = "image/webp"
  ".woff2" = "font/woff2"; ".md" = "text/plain; charset=utf-8"
}
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  try {
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
    if ($path -eq "/") { $path = "/index.html" }
    $file = Join-Path $root $path.TrimStart("/").Replace("/", "\")
    $resolved = [System.IO.Path]::GetFullPath($file)
    if (-not $resolved.StartsWith($root) -or -not (Test-Path $resolved -PathType Leaf)) {
      $ctx.Response.StatusCode = 404
      $bytes = [Text.Encoding]::UTF8.GetBytes("404 not found")
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $ext = [System.IO.Path]::GetExtension($resolved).ToLowerInvariant()
      if ($types.ContainsKey($ext)) { $ctx.Response.ContentType = $types[$ext] }
      $bytes = [System.IO.File]::ReadAllBytes($resolved)
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    }
  } catch { }
  finally { try { $ctx.Response.OutputStream.Close() } catch { } }
}

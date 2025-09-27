export default function PartytownDemo() {
  return (
    <div className="partytown-demo">
      <h3>🎉 Partytown Integration</h3>
      <p>Partytown is ready to use for third-party scripts!</p>
      <p>Add your analytics, tracking, or marketing scripts here to run them in a web worker.</p>
      
      <div className="demo-info">
        <h4>Benefits:</h4>
        <ul>
          <li>✅ Non-blocking third-party scripts</li>
          <li>✅ Better performance</li>
          <li>✅ Improved Core Web Vitals</li>
          <li>✅ Sandboxed execution</li>
        </ul>
      </div>

      <div className="demo-code">
        <h4>Example Usage:</h4>
        <pre>
{`<script type="text/partytown">
  // Google Analytics, Facebook Pixel, etc.
  // These will run in a web worker!
</script>`}
        </pre>
      </div>

      <div className="partytown-status">
        <p><strong>Status:</strong> ✅ Partytown is configured in astro.config.mjs</p>
        <p><strong>Usage:</strong> Add <code>type="text/partytown"</code> to any script tag</p>
      </div>
    </div>
  );
}
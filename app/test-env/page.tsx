/**
 * Page de diagnostic des variables d'environnement
 * Accessible sur /test-env
 * 
 * Cette page permet de vérifier rapidement quelles variables
 * d'environnement sont configurées sur Vercel
 */

export const dynamic = 'force-dynamic'

export default function TestEnvPage() {
  const envVars = {
    // Database
    DATABASE_URL: !!process.env.DATABASE_URL,
    
    // Auth
    AUTH_URL: process.env.AUTH_URL || 'NOT SET',
    AUTH_SECRET: !!process.env.AUTH_SECRET,
    
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    
    // Stripe
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
    
    // PayTech
    PAYTECH_API_KEY: !!process.env.PAYTECH_API_KEY,
    PAYTECH_API_SECRET: !!process.env.PAYTECH_API_SECRET,
    PAYTECH_ENV: process.env.PAYTECH_ENV || 'NOT SET',
    
    // Uploadthing
    UPLOADTHING_TOKEN: !!process.env.UPLOADTHING_TOKEN,
    UPLOADTHING_SECRET: !!process.env.UPLOADTHING_SECRET,
    
    // Resend
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    
    // OAuth
    GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: !!process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: !!process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: !!process.env.GITHUB_CLIENT_SECRET,
  }

  const criticalVars = {
    DATABASE_URL: envVars.DATABASE_URL,
    AUTH_SECRET: envVars.AUTH_SECRET,
    NEXT_PUBLIC_SUPABASE_URL: envVars.NEXT_PUBLIC_SUPABASE_URL !== 'NOT SET',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: envVars.SUPABASE_SERVICE_ROLE_KEY,
  }

  const allCriticalConfigured = Object.values(criticalVars).every(v => 
    typeof v === 'boolean' ? v === true : v !== 'NOT SET'
  )
  const missingCritical = Object.entries(criticalVars)
    .filter(([, value]) => !value || value === 'NOT SET')
    .map(([key]) => key)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            🔍 Diagnostic des Variables d'Environnement
          </h1>
          <p className="text-slate-600 mb-8">
            Cette page vous permet de vérifier rapidement quelles variables sont configurées
          </p>

          {/* Status Global */}
          <div className={`p-4 rounded-lg mb-8 ${
            allCriticalConfigured 
              ? 'bg-green-50 border-2 border-green-200' 
              : 'bg-red-50 border-2 border-red-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`text-2xl ${allCriticalConfigured ? 'text-green-600' : 'text-red-600'}`}>
                {allCriticalConfigured ? '✅' : '❌'}
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${
                  allCriticalConfigured ? 'text-green-900' : 'text-red-900'
                }`}>
                  {allCriticalConfigured 
                    ? 'Toutes les variables critiques sont configurées !' 
                    : 'Certaines variables critiques sont manquantes'}
                </h2>
                {!allCriticalConfigured && (
                  <p className="text-red-700 text-sm mt-1">
                    Variables manquantes : {missingCritical.join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Variables Critiques */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-red-600">⚠️</span>
              Variables Critiques (OBLIGATOIRES)
            </h3>
            <div className="space-y-3">
              {Object.entries(criticalVars).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-mono text-sm text-slate-700">{key}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    value === true || (typeof value === 'string' && value !== 'NOT SET')
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {value === true || (typeof value === 'string' && value !== 'NOT SET') ? '✓ Configuré' : '✗ Manquant'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Toutes les Variables */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              📋 Toutes les Variables
            </h3>
            <div className="space-y-2">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded">
                  <span className="font-mono text-sm text-slate-600">{key}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    value === true || (typeof value === 'string' && value !== 'NOT SET')
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {typeof value === 'boolean' 
                      ? (value ? '✓' : '✗') 
                      : value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
            <h3 className="font-semibold text-blue-900 mb-2">💡 Comment configurer les variables sur Vercel</h3>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Allez dans votre projet Vercel</li>
              <li>Cliquez sur Settings → Environment Variables</li>
              <li>Ajoutez chaque variable manquante</li>
              <li>Cochez Production, Preview, et Development</li>
              <li>Redéployez votre application</li>
            </ol>
            <p className="text-sm text-blue-800 mt-3">
              📖 Consultez le fichier <code className="bg-blue-100 px-1 rounded">VERCEL_DEPLOYMENT.md</code> pour plus de détails
            </p>
          </div>

          {/* Légende */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Note : Les valeurs booléennes indiquent si la variable est définie (true) ou non (false).
              Les valeurs textuelles montrent le contenu des variables publiques (NEXT_PUBLIC_*).
              Les secrets ne sont jamais affichés pour des raisons de sécurité.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

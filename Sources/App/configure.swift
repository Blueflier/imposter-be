import Vapor

public func configure(_ app: Application) throws {
    // ... existing configuration
    
    // Add health check endpoint
    app.get("health") { req -> String in
        return "OK"
    }
} 
# @qavajs/api-steps
This is a core package to get basic API cucumber steps.

```javascript
module.exports = {
    default: {
        require: [
            '@qavajs/steps-api'
        ],
        browser: {
            timeout: {
                present: 10000,
                visible: 20000    
            },
            capabilities: {
                browserName: 'chrome'
            }
        }
    }
}
```
## Parameter Types

## Steps
[api action steps](docs/api_action_steps.md)

[api validation steps](docs/api_validation_steps.md)

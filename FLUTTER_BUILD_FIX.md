# Flutter Build Error Fix: Missing `_$ProductFromJson`

## Error
```
lib/shared/models/product.dart:129:12: Error: Method not found: '_$ProductFromJson'.
    return _$ProductFromJson(normalizedJson);
           ^^^^^^^^^^^^^^^^^
```

## Root Cause
The `json_serializable` package generates code like `_$ProductFromJson` and `_$ProductToJson` at build time. This error occurs when:
1. The code generation hasn't been run yet
2. The generated `.g.dart` files are missing or outdated
3. The build_runner cache is corrupted

## Solution

### Step 1: Clean the project
```bash
flutter clean
```

### Step 2: Get dependencies
```bash
flutter pub get
```

### Step 3: Run code generation
Choose ONE of these commands:

**Option A: One-time generation**
```bash
flutter pub run build_runner build --delete-conflicting-outputs
```

**Option B: Watch mode (auto-regenerates on file changes)**
```bash
flutter pub run build_runner watch --delete-conflicting-outputs
```

### Step 4: Verify the generated file exists
Check that `lib/shared/models/product.g.dart` has been created.

### Step 5: Run your app again
```bash
flutter run -d ZY22D54TZZ
```

## If the error persists

1. **Check your pubspec.yaml has these dependencies:**
```yaml
dependencies:
  json_annotation: ^4.8.1

dev_dependencies:
  build_runner: ^2.4.6
  json_serializable: ^6.7.1
```

2. **Verify your product.dart file has the correct annotations:**
```dart
import 'package:json_annotation/json_annotation.dart';

part 'product.g.dart';

@JsonSerializable()
class Product {
  // ... your fields ...
  
  factory Product.fromJson(Map<String, dynamic> json) => _$ProductFromJson(json);
  Map<String, dynamic> toJson() => _$ProductToJson(this);
}
```

3. **If still failing, try a complete rebuild:**
```bash
flutter clean
flutter pub get
flutter pub run build_runner clean
flutter pub run build_runner build --delete-conflicting-outputs
flutter run -d ZY22D54TZZ
```

## Quick Command Sequence
Run these commands in order:
```bash
cd C:\Users\Zkratos\Desktop\agrihub
flutter clean
flutter pub get
flutter pub run build_runner build --delete-conflicting-outputs
flutter run -d ZY22D54TZZ
```

## Additional Notes
- The `--delete-conflicting-outputs` flag automatically resolves conflicts in generated files
- If you're actively developing, use `watch` mode to auto-regenerate on saves
- Generated `.g.dart` files should be committed to git unless specified otherwise in your `.gitignore`

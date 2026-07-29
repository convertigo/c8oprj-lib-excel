# Third-party notices

This project includes third-party open-source software. The project-level
license is available in [LICENSE](./LICENSE).

## SheetJS Community Edition

- Component: SheetJS Community Edition
- Version: 0.20.3
- Source: https://sheetjs.com/
- Distribution: https://cdn.sheetjs.com/xlsx-0.20.3/
- License: Apache License 2.0
- Integrated files:
  - `SheetJS/SheetJS.js` (`xlsx.full.min.js`)
  - `SheetJS/Shim.js` (`shim.min.js`)

The integrated files are unmodified official distribution artifacts. They
were renamed to preserve the existing Convertigo include paths.

SHA-256:

- `SheetJS/SheetJS.js`: `cc015130aa8521e7f088f88898eba949ccdcbfb38df0bd129b44b7273c3a6f41`
- `SheetJS/Shim.js`: `0c16091947c28ec153e281cd303d8b3867bd1d964607af6ad4f264ccd9e512e7`

Required attribution:

> SheetJS Community Edition -- https://sheetjs.com/
>
> Copyright (C) 2012-present SheetJS LLC
>
> Licensed under the Apache License, Version 2.0 (the "License");
> you may not use this file except in compliance with the License.
> You may obtain a copy of the License at
>
> http://www.apache.org/licenses/LICENSE-2.0
>
> Unless required by applicable law or agreed to in writing, software
> distributed under the License is distributed on an "AS IS" BASIS,
> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
> See the License for the specific language governing permissions and
> limitations under the License.

## Test workbooks

- `sample/non_regression_types.xlsx` was generated for this project from
  synthetic test data and contains no third-party business data.
- `sample/file_example_XLSX_50.xlsx` predates the current non-regression
  suite. Its original external source and redistribution terms are not
  documented in this repository. They must be confirmed before distributing
  this fixture outside the project.

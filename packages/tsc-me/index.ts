import * as agc from "ag-grid-community"
import { typeComparison } from "lib-with-peers"

// This should be fine, at build time, we'll resolve the peers correctly.
console.log(typeComparison(agc))
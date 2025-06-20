use std::str::from_utf8_unchecked;
use tailwindcss_oxide::extractor::{Extracted, Extractor};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn extract(input: &str) -> Vec<JsValue> {
    Extractor::new(input.as_bytes())
        .extract()
        .into_iter()
        .map(|v| match v {
            Extracted::Candidate(bytes) => JsValue::from_str(unsafe { from_utf8_unchecked(bytes) }),
            Extracted::CssVariable(bytes) => {
                JsValue::from_str(unsafe { from_utf8_unchecked(bytes) })
            }
        })
        .collect::<Vec<_>>()
}

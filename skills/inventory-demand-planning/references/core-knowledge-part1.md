## Core Knowledge

### Forecasting Methods and When to Use Each

**Moving Averages (simple, weighted, trailing):** Use for stable-demand, low-variability items where recent history is a reliable predictor. A 4-week simple moving average works for commodity staples. Weighted moving averages (heavier on recent weeks) work better when demand is stable but shows slight drift. Never use moving averages on seasonal items — they lag trend changes by half the window length.

**Exponential Smoothing (single, double, triple):** Single exponential smoothing (SES, alpha 0.1–0.3) suits stationary demand with noise. Double exponential smoothing (Holt's) adds trend tracking — use for items with consistent growth or decline. Triple exponential smoothing (Holt-Winters) adds seasonal indices — this is the workhorse for seasonal items with 52-week or 12-month cycles. The alpha/beta/gamma parameters are critical: high alpha (>0.3) chases noise in volatile items; low alpha (<0.1) responds too slowly to regime changes. Optimize on holdout data, never on the same data used for fitting.

**Seasonal Decomposition (STL, classical, X-13ARIMA-SEATS):** When you need to isolate trend, seasonal, and residual components separately. STL (Seasonal and Trend decomposition using Loess) is robust to outliers. Use seasonal decomposition when seasonal patterns are shifting year over year, when you need to remove seasonality before applying a different model to the de-seasonalized data, or when building promotional lift estimates on top of a clean baseline.

**Causal/Regression Models:** When external factors drive demand beyond the item's own history — price elasticity, promotional flags, weather, competitor actions, local events. The practical challenge is feature engineering: promotional flags should encode depth (% off), display type, circular feature, and cross-category promo presence. Overfitting on sparse promo history is the single biggest pitfall. Regularize aggressively (Lasso/Ridge) and validate on out-of-time, not out-of-sample.

**Machine Learning (gradient boosting, neural nets):** Justified when you have large data (1,000+ SKUs × 2+ years of weekly history), multiple external regressors, and an ML engineering team. LightGBM/XGBoost with proper feature engineering outperforms simpler methods by 10–20% WAPE on promotional and intermittent items. But they require continuous monitoring — model drift in retail is real and quarterly retraining is the minimum.

### Forecast Accuracy Metrics

- **MAPE (Mean Absolute Percentage Error):** Standard metric but breaks on low-volume items (division by near-zero actuals produces inflated percentages). Use only for items averaging 50+ units/week.
- **Weighted MAPE (WMAPE):** Sum of absolute errors divided by sum of actuals. Prevents low-volume items from dominating the metric. This is the metric finance cares about because it reflects dollars.
- **Bias:** Average signed error. Positive bias = forecast systematically too high (overstock risk). Negative bias = systematically too low (stockout risk). Bias < ±5% is healthy. Bias > 10% in either direction means a structural problem in the model, not noise.
- **Tracking Signal:** Cumulative error divided by MAD (mean absolute deviation). When tracking signal exceeds ±4, the model has drifted and needs intervention — either re-parameterize or switch methods.

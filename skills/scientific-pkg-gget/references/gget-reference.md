# gget Module Reference

Detailed module list and examples for the `gget` CLI and Python package.

## Common Modules

Use current upstream docs for exact arguments. These modules are common first choices:

- `gget search`: find Ensembl IDs from search terms.
- `gget info`: retrieve metadata for Ensembl, UniProt, or related IDs.
- `gget seq`: fetch nucleotide or amino-acid sequences.
- `gget ref`: retrieve reference genome download links.
- `gget blast`: run a quick BLAST query.
- `gget blat`: locate a sequence against supported genome assemblies.
- `gget muscle`: run multiple sequence alignment.
- `gget diamond`: run local sequence alignment against reference sequences.
- `gget alphafold` and `gget pdb`: inspect protein-structure references.
- `gget enrichr`, `gget opentargets`, `gget archs4`, `gget bgee`, `gget cbio`, and `gget cosmic`: explore enrichment, target, expression, cancer, and disease association data.

Do not assume every module supports every Python version or dependency set. Some optional scientific dependencies have narrower version support than the core package.

## Quick Examples

Find genes:

```bash
gget search -s human brca1 dna repair -o brca1-search.json
```

Fetch gene metadata:

```bash
gget info ENSG00000012048 -o brca1-info.json
```

Fetch a sequence:

```bash
gget seq ENSG00000012048 -o brca1-seq.fa
```

Run a small BLAST query:

```bash
gget blast "MEEPQSDPSVEPPLSQETFSDLWKLLPEN" -l 10 -o blast-results.json
```

Python example:

```python
import gget

genes = gget.search(["BRCA1", "DNA repair"], species="human")
info = gget.info(["ENSG00000012048"])
sequence = gget.seq("ENSG00000012048")
```

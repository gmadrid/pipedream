import openai from "../../openai.app.mjs";
import common from "../common.mjs";

export default {
  ...common,
  key: "openai-new-file-created",
  name: "New File Created",
  description: "Emit new event when a new file is created in OpenAI. [See the documentation](https://platform.openai.com/docs/api-reference/files/list)",
  version: "0.0.1",
  type: "source",
  dedupe: "unique",
  props: {
    ...common.props,
    purpose: {
      propDefinition: [
        openai,
        "purpose",
      ],
      description: "If specified, events will only be emitted for files with the specified purpose.",
      optional: true,
    },
  },
  methods: {
    ...common.methods,
    async getData() {
      return this.openai.listFiles({
        purpose: this.purpose,
      });
    },
    getMeta(item) {
      return {
        id: item.id,
        summary: `New File: ${item.filename}`,
        ts: item.created_at * 1000,
      };
    },
  },
};

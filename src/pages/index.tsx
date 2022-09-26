import React, { useEffect } from 'react';
import { createStyles, Container, Text, Button, Group, useMantineTheme } from '@mantine/core';
import MainLayout from '@/components/Layout';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store';
import { LanguageSwitch } from '@/components/LanguageSwitch';
import { helper } from '@/lib/helper';
import Form, { FormState, IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv6';
import { FromSchema } from 'json-schema-to-ts';
import { UiSchema, RJSFSchema } from '@rjsf/utils';
import { makeAutoObservable } from 'mobx';

const schemaData = {
  title: 'Property dependencies',
  description: 'These samples are best viewed without live validation.',
  type: 'object',
  properties: {
    unidirectional: {
      title: 'Unidirectional',
      src: 'https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies',
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        credit_card: {
          type: 'number'
        },
        billing_address: {
          type: 'string'
        }
      },
      required: ['name'],
      dependencies: {
        credit_card: ['billing_address']
      }
    },
    bidirectional: {
      title: 'Bidirectional',
      src: 'https://spacetelescope.github.io/understanding-json-schema/reference/object.html#dependencies',
      description: 'Dependencies are not bidirectional, you can, of course, define the bidirectional dependencies explicitly.',
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        credit_card: {
          type: 'number'
        },
        billing_address: {
          type: 'string'
        }
      },
      required: ['name'],
      dependencies: {
        credit_card: ['billing_address'],
        billing_address: ['credit_card']
      }
    }
  }
} as const;
type SchemaType = FromSchema<typeof schemaData>;

class JSONSchemaState<T> {
  data: {};
  schema: RJSFSchema;
  uiSchema: UiSchema;
  reactive: boolean;
  onSubmit: (e: IChangeEvent<T>) => void;
  renderForm() {
    return <Form schema={this.schema} uiSchema={this.uiSchema} validator={validator} onSubmit={this.onSubmit} />;
  }
  renderModal() {
    return <Form schema={this.schema} uiSchema={this.uiSchema} validator={validator} onSubmit={this.onSubmit} />;
  }

  constructor(args: Partial<JSONSchemaState<T>> = {}) {
    Object.assign(this, args);
    if (this.reactive) {
      makeAutoObservable(this);
    }
  }
}

const schema = new JSONSchemaState<SchemaType>({
  schema: schemaData,
  onSubmit(e) {
    console.log(e.formData);
  }
});

export default function HeroTitle() {
  return (
    <div>
      <div>
        <Container>{schema.renderForm()}</Container>
      </div>
    </div>
  );
}

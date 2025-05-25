
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { TestConfig, Category } from './TestConfigurationApp';
import { useTestDefinitions } from '@/hooks/useTestDefinitions';

interface SaveConfigurationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testConfig: TestConfig;
  categories: Category[];
  editMode?: boolean;
  configurationId?: string;
}

const SaveConfigurationDialog = ({ 
  open, 
  onOpenChange, 
  testConfig, 
  categories,
  editMode = false,
  configurationId
}: SaveConfigurationDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const { saveTestDefinition, updateTestDefinition, fetchTestDefinitionById } = useTestDefinitions();

  // Load existing configuration data when in edit mode
  useEffect(() => {
    if (editMode && configurationId && open) {
      const loadConfiguration = async () => {
        const config = await fetchTestDefinitionById(configurationId);
        if (config) {
          setName(config.name);
          setDescription(config.description || '');
        }
      };
      loadConfiguration();
    } else if (!editMode) {
      // Clear form when not in edit mode
      setName('');
      setDescription('');
    }
  }, [editMode, configurationId, open, fetchTestDefinitionById]);

  const handleSave = async () => {
    if (!name.trim()) return;

    setSaving(true);
    let result;

    if (editMode && configurationId) {
      result = await updateTestDefinition(configurationId, name, description, testConfig, categories);
    } else {
      result = await saveTestDefinition(name, description, testConfig, categories);
    }

    setSaving(false);

    if (result) {
      setName('');
      setDescription('');
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    if (!editMode) {
      setName('');
      setDescription('');
    }
    onOpenChange(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Name input change:', e.target.value);
    setName(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Description input change:', e.target.value);
    setDescription(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {editMode ? 'Update Test Configuration' : 'Save Test Configuration'}
          </DialogTitle>
          <DialogDescription>
            {editMode 
              ? 'Update your test configuration details.'
              : 'Give your test configuration a name and description to save it for later use.'
            }
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="config-name">Configuration Name</Label>
            <Input
              id="config-name"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="e.g., Software Skills Assessment"
              autoComplete="off"
              disabled={saving}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="config-description">Description (Optional)</Label>
            <Textarea
              id="config-description"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Brief description of this test configuration..."
              rows={3}
              disabled={saving}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim() || saving}>
            {saving 
              ? (editMode ? 'Updating...' : 'Saving...') 
              : (editMode ? 'Update Configuration' : 'Save Configuration')
            }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveConfigurationDialog;

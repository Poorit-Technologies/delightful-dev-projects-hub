
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
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const { saveTestDefinition, updateTestDefinition, fetchTestDefinitionById, userProfile } = useTestDefinitions();

  // Check if user can save/edit configurations (admin or super_admin)
  const canSaveConfiguration = userProfile?.role === 'admin' || userProfile?.role === 'super_admin';

  // Load existing configuration data when in edit mode - only once per dialog opening
  useEffect(() => {
    if (editMode && configurationId && open && !hasLoadedData) {
      console.log('Loading configuration data for edit mode');
      const loadConfiguration = async () => {
        try {
          const config = await fetchTestDefinitionById(configurationId);
          if (config) {
            console.log('Loaded config:', config);
            setName(config.name);
            setDescription(config.description || '');
            setHasLoadedData(true);
          }
        } catch (error) {
          console.error('Error loading configuration:', error);
        }
      };
      loadConfiguration();
    } else if (!editMode && open) {
      // Clear form when not in edit mode and dialog opens
      console.log('Clearing form for new configuration');
      setName('');
      setDescription('');
      setHasLoadedData(false);
    }
  }, [editMode, configurationId, open, hasLoadedData, fetchTestDefinitionById]);

  // Reset hasLoadedData when dialog closes
  useEffect(() => {
    if (!open) {
      setHasLoadedData(false);
    }
  }, [open]);

  const handleSave = async () => {
    if (!name.trim() || !canSaveConfiguration) return;

    console.log('Saving configuration with name:', name);
    setSaving(true);
    let result;

    try {
      if (editMode && configurationId) {
        result = await updateTestDefinition(configurationId, name, description, testConfig, categories);
      } else {
        result = await saveTestDefinition(name, description, testConfig, categories);
      }

      if (result) {
        console.log('Configuration saved successfully');
        setName('');
        setDescription('');
        setHasLoadedData(false);
        onOpenChange(false);
      }
    } catch (error) {
      console.error('Error saving configuration:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    console.log('Closing dialog');
    if (!editMode) {
      setName('');
      setDescription('');
    }
    setHasLoadedData(false);
    onOpenChange(false);
  };

  // Show different content if user doesn't have permission
  if (!canSaveConfiguration) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Access Restricted</DialogTitle>
            <DialogDescription>
              Only administrators can save test configurations. Please contact your organization admin for assistance.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleClose}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

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
              onChange={(e) => {
                console.log('Name changed to:', e.target.value);
                setName(e.target.value);
              }}
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
              onChange={(e) => {
                console.log('Description changed to:', e.target.value);
                setDescription(e.target.value);
              }}
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
